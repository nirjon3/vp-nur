import { sql } from '@payloadcms/db-sqlite'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`audit_logs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`summary\` text NOT NULL,
  	\`collection\` text NOT NULL,
  	\`document_id\` text,
  	\`action\` text NOT NULL,
  	\`actor\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_logs_collection_idx\` ON \`audit_logs\` (\`collection\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_updated_at_idx\` ON \`audit_logs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_logs_created_at_idx\` ON \`audit_logs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`news_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`news_body_order_idx\` ON \`news_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`news_body_parent_id_idx\` ON \`news_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`news\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`date\` text,
  	\`category\` text,
  	\`featured\` integer DEFAULT false,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`excerpt_bn\` text,
  	\`excerpt_en\` text,
  	\`hero_image_id\` integer,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`news_slug_idx\` ON \`news\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`news_hero_image_idx\` ON \`news\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`news_updated_at_idx\` ON \`news\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`news_created_at_idx\` ON \`news\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`news__status_idx\` ON \`news\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_news_v_version_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_news_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_news_v_version_body_order_idx\` ON \`_news_v_version_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_version_body_parent_id_idx\` ON \`_news_v_version_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_news_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_category\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_excerpt_bn\` text,
  	\`version_excerpt_en\` text,
  	\`version_hero_image_id\` integer,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_news_v_parent_idx\` ON \`_news_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_version_version_slug_idx\` ON \`_news_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_version_version_hero_image_idx\` ON \`_news_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_version_version_updated_at_idx\` ON \`_news_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_version_version_created_at_idx\` ON \`_news_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_version_version__status_idx\` ON \`_news_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_created_at_idx\` ON \`_news_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_updated_at_idx\` ON \`_news_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_latest_idx\` ON \`_news_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`speeches_transcript\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`speeches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`speeches_transcript_order_idx\` ON \`speeches_transcript\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`speeches_transcript_parent_id_idx\` ON \`speeches_transcript\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`speeches\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`date\` text,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`subject_bn\` text,
  	\`subject_en\` text,
  	\`location_bn\` text,
  	\`location_en\` text,
  	\`video_url\` text,
  	\`duration_minutes\` numeric,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`speeches_slug_idx\` ON \`speeches\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`speeches_updated_at_idx\` ON \`speeches\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`speeches_created_at_idx\` ON \`speeches\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`speeches__status_idx\` ON \`speeches\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_speeches_v_version_transcript\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_speeches_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_speeches_v_version_transcript_order_idx\` ON \`_speeches_v_version_transcript\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_version_transcript_parent_id_idx\` ON \`_speeches_v_version_transcript\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_speeches_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_subject_bn\` text,
  	\`version_subject_en\` text,
  	\`version_location_bn\` text,
  	\`version_location_en\` text,
  	\`version_video_url\` text,
  	\`version_duration_minutes\` numeric,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`speeches\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_speeches_v_parent_idx\` ON \`_speeches_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_version_version_slug_idx\` ON \`_speeches_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_version_version_updated_at_idx\` ON \`_speeches_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_version_version_created_at_idx\` ON \`_speeches_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_version_version__status_idx\` ON \`_speeches_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_created_at_idx\` ON \`_speeches_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_updated_at_idx\` ON \`_speeches_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_speeches_v_latest_idx\` ON \`_speeches_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`date\` text,
  	\`end_date\` text,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`location_bn\` text,
  	\`location_en\` text,
  	\`description_bn\` text,
  	\`description_en\` text,
  	\`confirmed_by_organiser\` integer DEFAULT false,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_slug_idx\` ON \`events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`events__status_idx\` ON \`events\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_events_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_end_date\` text,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_location_bn\` text,
  	\`version_location_en\` text,
  	\`version_description_bn\` text,
  	\`version_description_en\` text,
  	\`version_confirmed_by_organiser\` integer DEFAULT false,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_parent_idx\` ON \`_events_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_slug_idx\` ON \`_events_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_updated_at_idx\` ON \`_events_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_created_at_idx\` ON \`_events_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version__status_idx\` ON \`_events_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_created_at_idx\` ON \`_events_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_updated_at_idx\` ON \`_events_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_latest_idx\` ON \`_events_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`initiatives_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`initiatives\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`initiatives_body_order_idx\` ON \`initiatives_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`initiatives_body_parent_id_idx\` ON \`initiatives_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`initiatives_updates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`date\` text,
  	\`text_bn\` text,
  	\`text_en\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`initiatives\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`initiatives_updates_order_idx\` ON \`initiatives_updates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`initiatives_updates_parent_id_idx\` ON \`initiatives_updates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`initiatives\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`status\` text DEFAULT 'planned',
  	\`category\` text,
  	\`location_bn\` text,
  	\`location_en\` text,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`excerpt_bn\` text,
  	\`excerpt_en\` text,
  	\`start_date\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`initiatives_slug_idx\` ON \`initiatives\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`initiatives_updated_at_idx\` ON \`initiatives\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`initiatives_created_at_idx\` ON \`initiatives\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`initiatives__status_idx\` ON \`initiatives\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_initiatives_v_version_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_initiatives_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_body_order_idx\` ON \`_initiatives_v_version_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_body_parent_id_idx\` ON \`_initiatives_v_version_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_initiatives_v_version_updates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`date\` text,
  	\`text_bn\` text,
  	\`text_en\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_initiatives_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_updates_order_idx\` ON \`_initiatives_v_version_updates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_updates_parent_id_idx\` ON \`_initiatives_v_version_updates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_initiatives_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_status\` text DEFAULT 'planned',
  	\`version_category\` text,
  	\`version_location_bn\` text,
  	\`version_location_en\` text,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_excerpt_bn\` text,
  	\`version_excerpt_en\` text,
  	\`version_start_date\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`initiatives\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_initiatives_v_parent_idx\` ON \`_initiatives_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_version_slug_idx\` ON \`_initiatives_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_version_updated_at_idx\` ON \`_initiatives_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_version_created_at_idx\` ON \`_initiatives_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_version_version__status_idx\` ON \`_initiatives_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_created_at_idx\` ON \`_initiatives_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_updated_at_idx\` ON \`_initiatives_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_initiatives_v_latest_idx\` ON \`_initiatives_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`parliament_activities_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`parliament_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`parliament_activities_body_order_idx\` ON \`parliament_activities_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`parliament_activities_body_parent_id_idx\` ON \`parliament_activities_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`parliament_activities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`date\` text,
  	\`category\` text,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`excerpt_bn\` text,
  	\`excerpt_en\` text,
  	\`session_bn\` text,
  	\`session_en\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`parliament_activities_slug_idx\` ON \`parliament_activities\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`parliament_activities_updated_at_idx\` ON \`parliament_activities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`parliament_activities_created_at_idx\` ON \`parliament_activities\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`parliament_activities__status_idx\` ON \`parliament_activities\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_parliament_activities_v_version_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph_bn\` text,
  	\`paragraph_en\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_parliament_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_version_body_order_idx\` ON \`_parliament_activities_v_version_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_version_body_parent_id_idx\` ON \`_parliament_activities_v_version_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_parliament_activities_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_category\` text,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_excerpt_bn\` text,
  	\`version_excerpt_en\` text,
  	\`version_session_bn\` text,
  	\`version_session_en\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`parliament_activities\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_parent_idx\` ON \`_parliament_activities_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_version_version_slug_idx\` ON \`_parliament_activities_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_version_version_updated_at_idx\` ON \`_parliament_activities_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_version_version_created_at_idx\` ON \`_parliament_activities_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_version_version__status_idx\` ON \`_parliament_activities_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_created_at_idx\` ON \`_parliament_activities_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_updated_at_idx\` ON \`_parliament_activities_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_parliament_activities_v_latest_idx\` ON \`_parliament_activities_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`publications\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`date\` text,
  	\`category_bn\` text,
  	\`category_en\` text,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`description_bn\` text,
  	\`description_en\` text,
  	\`file_id\` integer,
  	\`external_url\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`publications_slug_idx\` ON \`publications\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`publications_file_idx\` ON \`publications\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`publications_updated_at_idx\` ON \`publications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`publications_created_at_idx\` ON \`publications\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`publications__status_idx\` ON \`publications\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_publications_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_category_bn\` text,
  	\`version_category_en\` text,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_description_bn\` text,
  	\`version_description_en\` text,
  	\`version_file_id\` integer,
  	\`version_external_url\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`publications\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_publications_v_parent_idx\` ON \`_publications_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_version_version_slug_idx\` ON \`_publications_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_version_version_file_idx\` ON \`_publications_v\` (\`version_file_id\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_version_version_updated_at_idx\` ON \`_publications_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_version_version_created_at_idx\` ON \`_publications_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_version_version__status_idx\` ON \`_publications_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_created_at_idx\` ON \`_publications_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_updated_at_idx\` ON \`_publications_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_publications_v_latest_idx\` ON \`_publications_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`timeline_milestones\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`date_label_bn\` text,
  	\`date_label_en\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`title_bn\` text,
  	\`title_en\` text,
  	\`body_bn\` text,
  	\`body_en\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`workflow_publish_at\` text,
  	\`verification_status\` text DEFAULT 'pending',
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`timeline_milestones_slug_idx\` ON \`timeline_milestones\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`timeline_milestones_updated_at_idx\` ON \`timeline_milestones\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`timeline_milestones_created_at_idx\` ON \`timeline_milestones\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`timeline_milestones__status_idx\` ON \`timeline_milestones\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_timeline_milestones_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_date_label_bn\` text,
  	\`version_date_label_en\` text,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_title_bn\` text,
  	\`version_title_en\` text,
  	\`version_body_bn\` text,
  	\`version_body_en\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_workflow_publish_at\` text,
  	\`version_verification_status\` text DEFAULT 'pending',
  	\`version_verification_source_url\` text,
  	\`version_verification_source_label\` text,
  	\`version_verification_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`timeline_milestones\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_parent_idx\` ON \`_timeline_milestones_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_version_version_slug_idx\` ON \`_timeline_milestones_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_version_version_updated_at_idx\` ON \`_timeline_milestones_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_version_version_created_at_idx\` ON \`_timeline_milestones_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_version_version__status_idx\` ON \`_timeline_milestones_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_created_at_idx\` ON \`_timeline_milestones_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_updated_at_idx\` ON \`_timeline_milestones_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_timeline_milestones_v_latest_idx\` ON \`_timeline_milestones_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt_bn\` text NOT NULL,
  	\`alt_en\` text NOT NULL,
  	\`caption_bn\` text,
  	\`caption_en\` text,
  	\`verification_status\` text DEFAULT 'pending' NOT NULL,
  	\`verification_source_url\` text,
  	\`verification_source_label\` text,
  	\`verification_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`citizen_request_attachments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`citizen_request_attachments_updated_at_idx\` ON \`citizen_request_attachments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`citizen_request_attachments_created_at_idx\` ON \`citizen_request_attachments\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`citizen_request_attachments_filename_idx\` ON \`citizen_request_attachments\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`citizen_requests_status_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`status\` text NOT NULL,
  	\`at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`citizen_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`citizen_requests_status_history_order_idx\` ON \`citizen_requests_status_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`citizen_requests_status_history_parent_id_idx\` ON \`citizen_requests_status_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`citizen_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ref\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`union\` text,
  	\`category\` text NOT NULL,
  	\`subject\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`attachment_id\` integer,
  	\`status\` text DEFAULT 'received' NOT NULL,
  	\`internal_note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`attachment_id\`) REFERENCES \`citizen_request_attachments\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`citizen_requests_ref_idx\` ON \`citizen_requests\` (\`ref\`);`)
  await db.run(sql`CREATE INDEX \`citizen_requests_attachment_idx\` ON \`citizen_requests\` (\`attachment_id\`);`)
  await db.run(sql`CREATE INDEX \`citizen_requests_updated_at_idx\` ON \`citizen_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`citizen_requests_created_at_idx\` ON \`citizen_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`audit_logs_id\` integer,
  	\`news_id\` integer,
  	\`speeches_id\` integer,
  	\`events_id\` integer,
  	\`initiatives_id\` integer,
  	\`parliament_activities_id\` integer,
  	\`publications_id\` integer,
  	\`timeline_milestones_id\` integer,
  	\`media_id\` integer,
  	\`citizen_request_attachments_id\` integer,
  	\`citizen_requests_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_logs_id\`) REFERENCES \`audit_logs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`speeches_id\`) REFERENCES \`speeches\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`initiatives_id\`) REFERENCES \`initiatives\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parliament_activities_id\`) REFERENCES \`parliament_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`publications_id\`) REFERENCES \`publications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`timeline_milestones_id\`) REFERENCES \`timeline_milestones\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`citizen_request_attachments_id\`) REFERENCES \`citizen_request_attachments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`citizen_requests_id\`) REFERENCES \`citizen_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audit_logs_id_idx\` ON \`payload_locked_documents_rels\` (\`audit_logs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_speeches_id_idx\` ON \`payload_locked_documents_rels\` (\`speeches_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_initiatives_id_idx\` ON \`payload_locked_documents_rels\` (\`initiatives_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parliament_activities_id_idx\` ON \`payload_locked_documents_rels\` (\`parliament_activities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_publications_id_idx\` ON \`payload_locked_documents_rels\` (\`publications_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_timeline_milestones_id_idx\` ON \`payload_locked_documents_rels\` (\`timeline_milestones_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_citizen_request_attachment_idx\` ON \`payload_locked_documents_rels\` (\`citizen_request_attachments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_citizen_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`citizen_requests_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_designation_bn\` text,
  	\`hero_designation_en\` text,
  	\`hero_intro_bn\` text,
  	\`hero_intro_en\` text,
  	\`hero_note_bn\` text,
  	\`hero_note_en\` text,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_settings_hero_image_idx\` ON \`homepage_settings\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_info\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`office_address_bn\` text,
  	\`office_address_en\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`office_hours_bn\` text,
  	\`office_hours_en\` text,
  	\`map_embed_url\` text,
  	\`map_link\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`social_links_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`social_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`social_links_links_order_idx\` ON \`social_links_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`social_links_links_parent_id_idx\` ON \`social_links_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`social_links\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`audit_logs\`;`)
  await db.run(sql`DROP TABLE \`news_body\`;`)
  await db.run(sql`DROP TABLE \`news\`;`)
  await db.run(sql`DROP TABLE \`_news_v_version_body\`;`)
  await db.run(sql`DROP TABLE \`_news_v\`;`)
  await db.run(sql`DROP TABLE \`speeches_transcript\`;`)
  await db.run(sql`DROP TABLE \`speeches\`;`)
  await db.run(sql`DROP TABLE \`_speeches_v_version_transcript\`;`)
  await db.run(sql`DROP TABLE \`_speeches_v\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`DROP TABLE \`_events_v\`;`)
  await db.run(sql`DROP TABLE \`initiatives_body\`;`)
  await db.run(sql`DROP TABLE \`initiatives_updates\`;`)
  await db.run(sql`DROP TABLE \`initiatives\`;`)
  await db.run(sql`DROP TABLE \`_initiatives_v_version_body\`;`)
  await db.run(sql`DROP TABLE \`_initiatives_v_version_updates\`;`)
  await db.run(sql`DROP TABLE \`_initiatives_v\`;`)
  await db.run(sql`DROP TABLE \`parliament_activities_body\`;`)
  await db.run(sql`DROP TABLE \`parliament_activities\`;`)
  await db.run(sql`DROP TABLE \`_parliament_activities_v_version_body\`;`)
  await db.run(sql`DROP TABLE \`_parliament_activities_v\`;`)
  await db.run(sql`DROP TABLE \`publications\`;`)
  await db.run(sql`DROP TABLE \`_publications_v\`;`)
  await db.run(sql`DROP TABLE \`timeline_milestones\`;`)
  await db.run(sql`DROP TABLE \`_timeline_milestones_v\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`citizen_request_attachments\`;`)
  await db.run(sql`DROP TABLE \`citizen_requests_status_history\`;`)
  await db.run(sql`DROP TABLE \`citizen_requests\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_settings\`;`)
  await db.run(sql`DROP TABLE \`contact_info\`;`)
  await db.run(sql`DROP TABLE \`social_links_links\`;`)
  await db.run(sql`DROP TABLE \`social_links\`;`)
}
