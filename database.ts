import { CreateRandomData } from './src/database/create.random-data'
import { RandomDynamicData } from './src/_utilities/random.dynamic-data';
import { RandomStaticData } from './src/_utilities/random.static-data/index';
import { MathUtilities } from './src/_utilities/math.utilities';

let operationsOnDatabase: CreateRandomData = new CreateRandomData();


//operationsOnDatabase.insertPersons(15000);

for (let i=1; i<=20; i++){
    //console.log(RandomDynamicData.randomText(RandomStaticData.paragraphs[i])); 
    console.log(RandomDynamicData.randomText('F#22#s'));    
    //console.log(MathUtilities.chance(2));
}


