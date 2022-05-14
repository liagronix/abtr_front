export type TListenerType = 'create' | 'update' | 'delete' | 'refresh';
export type TListener = {
  type: TListenerType;
  handler: any;
  fields: string[];
}
export default class CListener {
  listeners: TListener[];
  owner: any;

  constructor(owner:any) {
    // console.log(`Сonstructor of CListener`);
    this.listeners = [];
    this.owner = owner;
  }

  add(type: TListenerType, handler: any, fields: string[] = undefined) {
    const i = this.listeners.findIndex( (item:any) => item.handler==handler);
    if (i==-1) {
      this.listeners.push({
        type,
        handler,
        fields
      })
      // console.log('Добавлен listener. Общее количество: ', this.listeners.length);
    } else {
      this.listeners[i].fields = fields;
    }
  }

  remove(handler: any) {
    this.listeners = this.listeners.filter( (item:any) => item.handler!=handler );
    // const i = this.listeners.findIndex( (item:any) => item.handler=handler);
    // if (i!=-1) {
    //   this.listeners.splice(i,1)
    // } else {
    //   console.log('Ошибка удаления handler - обработчик не найден');
    // }
  }

  run(type: TListenerType, fields: string[] = undefined) {
    // console.log(`Запуск обработчиков ${type} listener ${fields ? "Поля: " : ""}`, fields ? fields :'');
    // console.log('Nums of listeners: ', Array.isArray(this.listeners)?this.listeners.length:0);
    for (let listener of this.listeners) {
      if (listener.type == type) {
        if (!listener.fields) {
          // console.log('Запуск обработчика #1');
          listener.handler(this.owner);
          continue;
        }

        if (Array.isArray(fields)) {
          // console.log(`listener.fields: `, listener.fields);
          for (let field of fields) {
            // console.log(`Цикл по полям обработчика. field=${field}`)
            if (listener.fields.includes(field)) {
              // console.log(`Запуск обработчика #2. field: ${field}, fields: `, fields);
              listener.handler(this.owner);
          } }
        }
    } }
  }


}
