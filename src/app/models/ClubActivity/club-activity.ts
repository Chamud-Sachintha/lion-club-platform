import { CreateUserObj } from "../CreateUserObj/create-user-obj";
import { Document } from "../Document/document";

export class ClubActivity {
    id!: string;
    token!: any;
    flag!: any;
    activityCode!: string;
    activityName!: string;
    activityTime!: string;
    clubCode!: any;
    activityCost!: number;
    conditionType!: number;
    createTime!: string;
    beneficiaries!: string;
    value!: string;
    documentList!: FormData;
    status!: number;
    creator!: number;
    type!: string;
    requestedRangeValue!: string;
    approvedPoints!: string;
    reCode!: string;
    zoneCode!: string;
    extValue!: string;
    createUser!: CreateUserObj;
    dateOfActivity!: string;
}
