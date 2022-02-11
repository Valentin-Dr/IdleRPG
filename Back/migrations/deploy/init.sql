-- Deploy idlerpg:init to pg

BEGIN;

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "level" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "desc" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "level_character" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "level" INT NOT NULL UNIQUE,
    "exp_req" INT NOT NULL UNIQUE,
    "level_id" INT NOT NULL REFERENCES "level"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "level_job" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "level" INT NOT NULL UNIQUE,
    "exp_req" INT NOT NULL UNIQUE,
    "level_id" INT NOT NULL REFERENCES "level"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "character" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "gold" INT NOT NULL DEFAULT 0,
    "exp" INT NOT NULL DEFAULT 0,
    "level_character_id" INT NOT NULL REFERENCES "level_character"(id),
    "user_id" INT NOT NULL REFERENCES "user"(id),
    "img_path" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "attribute" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "desc" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "equipment_slot" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "item_type" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "desc" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "item" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "item_type_id" INT NOT NULL REFERENCES "item_type"(id),
    "img_path" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "item_attribute" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" INT NOT NULL,
    "attribute_id" INT NOT NULL REFERENCES "attribute"(id),
    "item_id" INT NOT NULL REFERENCES "item"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "craft_plan" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "item_id" INT NOT NULL UNIQUE REFERENCES item(id),
    "quantity" INT NOT NULL,
    "component_id" INT NOT NULL REFERENCES item(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "craft_item" (
	"item_id" int REFERENCES "item"(id),
	"craft_plan_id" int REFERENCES "craft_plan"(id),
	CONSTRAINT "craft_item_id" PRIMARY KEY ("item_id", "craft_plan_id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "job" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "desc" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "character_job" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "exp" INT NOT NULL DEFAULT 0,
    "level_job_id" INT NOT NULL REFERENCES "level_job"(id),
    "character_id" INT NOT NULL REFERENCES "character"(id),
    "job_id" INT NOT NULL REFERENCES "job"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "character_equipment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "character_id" INT NOT NULL REFERENCES "character"(id),
    "equipment_slot_id" INT NOT NULL REFERENCES "equipment_slot"(id),
    "item_id" INT NOT NULL REFERENCES "item"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "character_attribute" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" INT NOT NULL,
    "attribute_id" INT NOT NULL REFERENCES "attribute"(id),
    "character_id" INT NOT NULL REFERENCES "character"(id) ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "inventory" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "character_id" INT NOT NULL REFERENCES "character"(id),
    "item_id" INT NOT NULL REFERENCES "item"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "entity" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "level" INT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "entity_attribute" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" INT NOT NULL,
    "attribute_id" INT NOT NULL REFERENCES "attribute"(id),
    "entity_id" INT NOT NULL REFERENCES "entity"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "reward" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "job_reward" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" INT NOT NULL,
    "reward_id" INT NOT NULL REFERENCES "reward"(id),
    "job_id" INT NOT NULL REFERENCES "job"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "item_reward" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "drop_rate" DECIMAL NOT NULL,
    "reward_id" INT NOT NULL REFERENCES "reward"(id),
    "item_id" INT NOT NULL REFERENCES "item"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "entity_reward" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" INT NOT NULL,
    "reward_id" INT NOT NULL REFERENCES "reward"(id),
    "entity_id" INT NOT NULL REFERENCES "entity"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "shop" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "quantity" INT NOT NULL,
    "item_id" INT NOT NULL REFERENCES "item"(id),
    "price" INT NOT NULL,
    "character_id" INT NOT NULL REFERENCES character(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
