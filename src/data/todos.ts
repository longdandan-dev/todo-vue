export interface Todo{
    id:number
    title:string
    done:boolean
}

export const todos: Todo[] =[
    {id: 1, title:'复习单一数据来源', done:true},
    {id: 2, title:'学习vue热更新', done:false},
    {id: 3, title:'学习搭建vue项目', done:true},
    {id: 4, title:'复习数据驱动', done:false},
]
 
