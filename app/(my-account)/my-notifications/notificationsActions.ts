export const actionsSpecialProducts = [2]
export const actionsOrder = [4,9,11,12,13];

export const notifyActionToQuery = (actions:number[]) => { 
    return actions.map(e=> "actions="+e ).join("&")
 }