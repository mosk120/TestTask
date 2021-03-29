public class OpportunityTriggerHandler extends TriggerHandler {

    public override void afterInsert() {
        Set<Id> AccountIds = new Set<Id>();

        for(Opportunity op : (List<Opportunity>) Trigger.new) {
            AccountIds.add(op.AccountId);
        }

        List<AggregateResult> results = [SELECT AccountId, COUNT(Id) countId 
                                            FROM Opportunity 
                                            WHERE AccountId IN:AccountIds
                                            GROUP BY AccountId];

        List<Account> accounts = new List<Account>();
        for(AggregateResult result:results) {
            Account account = new Account (Id=(Id)result.get('AccountId'), 
            RelatedOpportunities__c = (Integer)result.get('countId'));

            accounts.add(account);
        }
        update accounts; 
    }
}
