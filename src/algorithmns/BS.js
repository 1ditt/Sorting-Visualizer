import { swap } from "./helper";

const bs = (array,position,arraySteps,colorsSteps) => {
    let colorKey = colorsSteps[colorsSteps.length-1].slice();
    for(let i=0;i<array.length-1;i++)
    {
        for(let j=0;j<array.length-i-1;j++)
        {
            colorKey[j] = 1;
            colorKey[j+1] = 1;
            colorsSteps.push(colorKey.slice());
            arraySteps.push(array.slice());
            if(array[j] > array[j+1])
            {
                array = swap(array,j,j+1);
                arraySteps.push(array.slice());
                colorKey[j] = 3;
                colorKey[j+1] = 3;
                colorsSteps.push(colorKey.slice());
            }
            
            colorKey[j] = 0;
            colorKey[j+1] = 0;
        }
        colorKey[array.length-1-i] = 2;
        arraySteps.push(array.slice());
        colorsSteps.push(colorKey.slice());
    }
    colorsSteps[colorsSteps.length-1] = new Array(array.length).fill(2);
    return;
}

export default bs;