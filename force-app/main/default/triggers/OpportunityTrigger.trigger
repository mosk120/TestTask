trigger OpportunityTrigger on Opportunity (after insert, after delete, after update) {
    new OpportunityTriggerHandler().run();
}