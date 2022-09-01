import { Professor } from '../professors/professor.entity';
import { Active } from './active.entity';

const user = new Professor({}, {});

user.setUserState(Active.getInstance());

console.log(user.getUserState());
