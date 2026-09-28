export function makeClassCode(subject:string){
  const prefix=(subject.replace(/[^A-Za-z]/g,"").slice(0,3)||"CLS").toUpperCase();
  return `${prefix}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
}
