import { LightningElement } from 'lwc';
public with sharing class TenderContractController {
    @AuraEnabled(cacheable=true)
    public static List<Tender__c> getActiveTenders() {
        return [SELECT Id, Tender_Name__c, Status__c, End_Date__c 
                FROM Tender__c 
                WHERE Status__c = 'Open' AND End_Date__c >= TODAY 
                LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contract__c> getSignedContracts() {
        return [SELECT Id, Contract_Value__c, Status__c, Tender__r.Tender_Name__c 
                FROM Contract__c 
                WHERE Status__c = 'Signed' 
                LIMIT 10];
    }

    @AuraEnabled // Non-cacheable for DML
    public static void updateTenderStatus(Id tenderId, String status) {
        Tender__c tender = [SELECT Id, Status__c FROM Tender__c WHERE Id = :tenderId LIMIT 1];
        tender.Status__c = status;
        update tender;
    }
}
export default class TenderContractController extends LightningElement {}
