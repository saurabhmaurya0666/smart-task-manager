public with sharing class TaskManagerController {
    
    @AuraEnabled(cacheable=true)
    public static List<Task__c> getTasks() {
        return [
            SELECT Id, Name, Description__c, Status__c, Deadline__c, Priority__c, User__r.Name
            FROM Task__c 
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static Task__c saveTask(Task__c task) {
        upsert task;
        return task;
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        Task__c t = [SELECT Id FROM Task__c WHERE Id = :taskId LIMIT 1];
        delete t;
    }
}