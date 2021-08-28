const is = (array,position,arraySteps,colorsSteps) => {
    let colorKey = colorsSteps[colorsSteps.length-1].slice();
    let flag=0;
    let first=0;
    for(let i=1;i<array.length;i++)
    {
        let key = array[i];
        colorKey[i] = 1;
        arraySteps.push(array.slice());
        colorsSteps.push(colorKey.slice());
        let j;
        j = i - 1;
        colorKey[j] = 1;
        first = 1;
        flag=0;
        colorsSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
        while(j>=0 && key < array[j])
        {
            if(first===1)
            {
                colorKey[j] = 3;
                colorKey[j+1] = 3;
                array[j+1] = array[j];
                array[j]=key;
                colorsSteps.push(colorKey.slice());
                arraySteps.push(array.slice());
                colorKey[j] = 0;
                colorKey[j+1] = 0;
                flag = 1;
                j -= 1;
                first += 1;
            }
            else{
                colorKey[j] = 3;
                colorKey[j+1] = 3;
                colorsSteps.push(colorKey.slice());
                array[j+1] = array[j];
                array[j]=key;
                arraySteps.push(array.slice());
                colorKey[j] = 0;
                colorKey[j+1] = 0;
                flag = 1;
                j -= 1;
            }
            
        }
        array[j+1] = key;
        if(flag!==1)
        {
            colorKey[j] = 0;
            colorKey[i] = 0;
            arraySteps.push(array.slice());
            colorsSteps.push(colorKey.slice());
        }
        
    }
    colorsSteps[colorsSteps.length-1] = new Array(array.length).fill(2);
    return;
}

export default is;