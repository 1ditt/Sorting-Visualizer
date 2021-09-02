import { swap } from "./helper";
const sl = (array,position,arraySteps,colorsSteps) => {
    let colorKey = colorsSteps[colorsSteps.length-1].slice();
    for(let i=0;i<array.length-1;i++)
    {
        let min = i;
        colorKey[i] = 3;
        colorsSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
        for(let j=i+1;j<array.length;j++)
        {
            colorKey[j] = 1;
            if(array[min] > array[j])
            {
                if(min !== i)
                {
                    colorKey[min] = 1;
                    min = j;
                    colorKey[min] = 3;
                }
                else{
                    min = j;
                    colorKey[min] = 3;
                }
                
            }
            colorsSteps.push(colorKey.slice());
            arraySteps.push(array.slice());
        }
        colorKey[i] = 3;
        colorKey[min] = 3;
        colorsSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
        array = swap(array,min,i);
        for(let k=i+1;k<array.length;k++)
        {
            colorKey[k] = 0;
        }
        
        colorKey[i] = 2;
        arraySteps.push(array.slice());
        colorsSteps.push(colorKey.slice());
    }
    colorsSteps[colorsSteps.length-1] = new Array(array.length).fill(2);
    return;
}

export default sl;