-- Auto-generated SQL script #202110081521
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Plan','Engineering','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Actual','Engineering','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Plan','Procurement','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Actual','Procurement','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Plan','Construction','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Actual','Construction','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,Jan,Feb,Mar,Apr,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,25.0,50.0,75.0,100.0,'Plan','Commissioning','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Actual','Commissioning','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Plan','Overall','2022') GO
INSERT INTO DBinitiative.dbo.ProgressPlan (InitiativeId,PlanActual,ProgressPlanType,[Year])
	VALUES (65743,'Actual','Overall','2022') GO
UPDATE DBinitiative.dbo.ProgressPlan
	SET Feb=25.0,Aug=NULL,Jul=NULL,Sep=NULL,Jun=NULL
	WHERE ProgressPlanId=558235 GO
UPDATE DBinitiative.dbo.ProgressPlan
	SET Mar=NULL,Apr=25,Jul=65,Jun=55
	WHERE ProgressPlanId=558237 GO
UPDATE DBinitiative.dbo.ProgressPlan
	SET Mar=NULL
	WHERE ProgressPlanId=558238 GO
UPDATE DBinitiative.dbo.ProgressPlan
	SET Jun=NULL,Nov=90.0,Aug=NULL,Jul=NULL,Sep=80.0,Oct=85.0,[Dec]=100.0
	WHERE ProgressPlanId=558239 GO
UPDATE DBinitiative.dbo.ProgressPlan
	SET Aug=NULL,Jul=NULL,Jun=NULL
	WHERE ProgressPlanId=558240 GO
UPDATE DBinitiative.dbo.ProgressPlan
	SET Sep=NULL
	WHERE ProgressPlanId=558241 GO
