public with sharing class sorting {
    // @AuraEnabled (Cacheable=true)
    // public static List<Account> fetchContactLocal(){
    //     return [SELECT Id, Name, Type, Industry, CustomerPriority__c, OwnerId, Owner.Name, CreatedById, CreatedBy.Name, CreatedDate
    //     FROM Account Order By Name ASC];
    // }
    @AuraEnabled (Cacheable=true)
    public static List<Account> fetchContact(String field, String sortOrder){
        return Database.query('SELECT Id, Name, Type, Industry, CustomerPriority__c, OwnerId, Owner.Name, CreatedById, CreatedBy.Name, CreatedDate FROM Account ORDER BY '+field+' '+sortOrder+ ' LIMIT 10');
    }
}
