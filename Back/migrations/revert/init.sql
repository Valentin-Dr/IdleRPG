-- Revert idlerpg:init from pg

BEGIN;

DROP TABLE "shop";

DROP TABLE "entity_reward";

DROP TABLE "item_reward";

DROP TABLE "job_reward";

DROP TABLE "reward";

DROP TABLE "entity_attribute";

DROP TABLE "entity";

DROP TABLE "inventory";

DROP TABLE "character_attribute";

DROP TABLE "character_equipment";

DROP TABLE "character_job";

DROP TABLE "job";

DROP TABLE "craft_item";

DROP TABLE "craft_plan";

DROP TABLE "item_attribute";

DROP TABLE "item";

DROP TABLE "item_type";

DROP TABLE "equipment_slot";

DROP TABLE "attribute";

DROP TABLE "character";

DROP TABLE "level_job";

DROP TABLE "level_character";

DROP TABLE "level";

DROP TABLE "user";

COMMIT;
