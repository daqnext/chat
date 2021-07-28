import minimist from 'minimist';
import {common} from './common.js';

///process the args
var argv = minimist(process.argv.slice(2));
var args = common;
if(argv.config){
    var overwriteconf=await import('./'+argv.config+'.js')
    if(overwriteconf){
        args = { ...args,...overwriteconf[argv.config] }
    }
}
args={...args,...argv}

export {args};