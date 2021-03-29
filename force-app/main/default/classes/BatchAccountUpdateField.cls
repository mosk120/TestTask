public class BatchAccountUpdateField implements Database.Batchable<sObject> {
	String email = 'vladislav.petrusevich.uk@gmail.com';

	public Database.QueryLocator start(Database.BatchableContext BC) {
		String query = 'SELECT Id, Name, Description, RelatedOpportunities__c FROM Account';
		return Database.getQueryLocator(query);
	}
	
	public void execute(Database.BatchableContext BC, List<Account> scope) {
		for(Account a : scope) {
			a.Description = a.Name + ' ' + a.RelatedOpportunities__c;
		}
		update scope;
	}
	
	public void finish(Database.BatchableContext BC) {
		Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
 
		mail.setToAddresses(new String[] {email});
		mail.setReplyTo('vladislav.petrusevich.uk@gmail.com');
		mail.setSenderDisplayName('Batch Processing');
		mail.setSubject('Batch Process Completed');
		mail.setPlainTextBody('Batch Process has completed');
		
		Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

	}
}