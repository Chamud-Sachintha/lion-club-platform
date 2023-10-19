import { Document } from "../Document/document";

export class Activity {
    token!: any;
    flag!: any;
    activityCode!: string;
    activityName!: string;
    mainCatCode!: string;
    firstCatCode!: string;
    secondCatCode!: string;
    authUserCode!: string;
    templateCode!: string;
    pointTemplateCode!: string;
    documentCode!: string;
    documents: Document[] = [];
}
