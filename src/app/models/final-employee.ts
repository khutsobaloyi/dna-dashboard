import {Department} from './department';
import {Store} from './store'; 

export interface FinalEmployee {
    surname: string; //lib_nom
    name: string; //lib_pre
    id: number;  //cod_sirh
    blank_id: string;    //num_uid
    start_date: string;  //dat_debctt
    end_date: string;     //dat_finctt
    role: string;    //lib_mis
    department: Department[];
    store: Store;
    manager_id: number; //num_mngr
    lib_patr: string;
    //english parts
    lib_nom_en: string;
    lib_pre_en: string;
    lib_patr_en: string;
    lib_mis_en: string;
    lib_raysrv_en: string;
    lib_ou_en: string; 
    email: string; //mail
    mobile: string;
}