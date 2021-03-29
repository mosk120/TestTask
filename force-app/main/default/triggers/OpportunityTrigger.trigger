trigger OpportunityTrigger on Opportunity (after insert, after delete, after update, before insert, before update) {
    new OpportunityTriggerHandler().run();
}