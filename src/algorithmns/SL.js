import { swap } from "./helper";
const sl = (array,position,arraySteps,colorsSteps) => {
    let colorKey = colorsSteps[colorsSteps.length-1].slice();
    for(let i=0;i<array.length-1;i++)
    {
        let min = i;
        colorKey[i] = 1;
        for(let j=i+1;j<array.length;j++)
        {
            if(array[min] > array[j])
            {
                min = j;
            }
        }
        colorKey[min] = 1;
        colorsSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
        array = swap(array,min,i);
        colorKey[i] = 3;
        colorKey[min] = 3;
        colorsSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
        colorKey[min] = 0;
        colorKey[i] = 2;
        arraySteps.push(array.slice());
        colorsSteps.push(colorKey.slice());
    }
    colorsSteps[colorsSteps.length-1] = new Array(array.length).fill(2);
    return;
}

export default sl;