import React from 'react';
import { useTheme } from '@mui/material/styles';
// import { BarStack } from '@visx/shape';
// import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Grid } from '@visx/grid';
// import { GradientTealBlue } from '@visx/gradient';
// import { LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';
// import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
// import { scaleBand, scaleLinear } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';

// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
import {useListener} from '../../hooks';

let api:IRootAPI;
let tooltipTimeout: number;
// const verticalMargin = Number(process.env.REACT_APP_GRAPH_AREA_VERTICAL_MARGIN) || 60;

const getLabel = (d: any) => d.label;
const getCount = (d: any) => d.count;
const formatDate = (date: any) => date;

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: '#3C5AA8',
  color: 'white',
};

export type BarsProps = {
  width?: number;
  height?: number;
  events?: boolean;
};

type TooltipData = {
  label: string;
  title: string;
  count: number;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
};

export default function DistributionLifeSpanGraph({ events = false }: BarsProps) {
  api = useApi();
  // const data_version = api.cw.savedData.dataVersion;
  const gd = api.cw.savedData.getGraphData();
  const data = gd?.dataSet || [];
  const refresher = useListener(api.listeners, 'refresh', ['life-span-graph']);
  const theme = useTheme();
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } =
  useTooltip<TooltipData>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  if (!data.length) {
    return null
  };

  return (gd.width < 10 ) ? null : (
    <>
      <Typography variant="h5" color="primary.dark" sx={{m:1,p:0, wordWrap: 'break-word', textAlign:'left', opacity: 0.4}}>
        Histogram of distribution of user lifetimes <br/>(lifetime - is the amount of time in days from registration to
last activity)
      </Typography>

      <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={gd.width} height={gd.height}>
        <Group top={gd.verticalMargin / 2} left={0} width={gd.width} height={gd.height}>
            <Grid
              xScale={gd.xScale}
              yScale={gd.yScale}
              width={gd.xMax-20}
              left={20}
              xOffset={-20}
              height={gd.yMax}
              numTicksRows={gd.maxYvalue<10?gd.maxYvalue : 10}
              numTicksColumns={data.length}
              stroke="rgba(204, 210, 206, 0.6)"
            />
            <AxisLeft
              left={20}
              scale={gd.yScale}
              tickFormat={formatDate}
              tickValues={data.map(getCount)}
              stroke={theme.palette.primary.main}
              tickStroke={theme.palette.primary.main}
            />
            <text x="-75" y="32" transform="rotate(-90)" fontSize={11} fill={theme.palette.primary.dark}>
              Count of users
            </text>
            <text x="700" y="451" fontSize={11} fill={theme.palette.primary.dark}>
              Lifetime days
            </text>

            {data.map((d:any) => {
              const label = getLabel(d);
              const barWidth = gd.xScale.bandwidth();
              const barHeight = gd.yMax - (gd.yScale(getCount(d)) ?? 0);
              const barX = gd.xScale(label);
              const barY = gd.yMax - barHeight;
              return (

                <rect
                  key={`bar-${label}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={theme.palette.primary.light}
                  onMouseLeave={() => {
                    tooltipTimeout = window.setTimeout(() => {
                      hideTooltip();
                    }, 300);
                  }}

                  onMouseMove={(event) => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    // TooltipInPortal expects coordinates to be relative to containerRef
                    // localPoint returns coordinates relative to the nearest SVG, which
                    // is what containerRef is set to in this example.
                    const eventSvgCoords = localPoint(event);
                    const left = barX + barWidth / 2;
                    // console.log('x,y: ', left,eventSvgCoords?.y);
                    showTooltip({
                      tooltipData: d as TooltipData,
                      tooltipTop: eventSvgCoords?.y,
                      tooltipLeft: left,
                    });
                 }}
                />
              );
            })}
          </Group>
          <AxisBottom
            top={gd.yMax + gd.verticalMargin / 2}
            scale={gd.xScale}
            tickFormat={formatDate}
            stroke={theme.palette.primary.main}
            tickStroke={theme.palette.primary.main}
            tickLabelProps={() => ({
              fill: theme.palette.primary.dark,
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </svg>


        {tooltipOpen && tooltipData && (
          <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
            <div>
              <strong>{tooltipData.title}</strong>
            </div>
            <div>Count: {tooltipData.count}</div>
          </TooltipInPortal>
        )}
      </div>
    </>
  );
}
