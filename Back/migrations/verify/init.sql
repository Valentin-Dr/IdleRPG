-- Verify idlerpg:init on pg

BEGIN;

SELECT * FROM "user" WHERE FALSE;

SELECT * FROM "level" WHERE FALSE;

SELECT * FROM "level_character" WHERE FALSE;

SELECT * FROM "level_job" WHERE FALSE;

SELECT * FROM "character" WHERE FALSE;

SELECT * FROM "attribute" WHERE FALSE;

SELECT * FROM "equipment_slot" WHERE FALSE;

SELECT * FROM "item_type" WHERE FALSE;

SELECT * FROM "item_attribute" WHERE FALSE;

SELECT * FROM "item" WHERE FALSE;

SELECT * FROM "craft_plan" WHERE FALSE;

SELECT * FROM "craft_item" WHERE FALSE;

SELECT * FROM "job" WHERE FALSE;

SELECT * FROM "character_job" WHERE FALSE;

SELECT * FROM "character_equipment" WHERE FALSE;

SELECT * FROM "character_attribute" WHERE FALSE;

SELECT * FROM "inventory" WHERE FALSE;

SELECT * FROM "entity" WHERE FALSE;

SELECT * FROM "entity_attribute" WHERE FALSE;

SELECT * FROM "reward" WHERE FALSE;

SELECT * FROM "job_reward" WHERE FALSE;

SELECT * FROM "item_reward" WHERE FALSE;

SELECT * FROM "entity_reward" WHERE FALSE;

SELECT * FROM "shop" WHERE FALSE;

ROLLBACK;
