#!/usr/bin/env bash
-u postgres psql
DROP SCHEMA public CASCADE
CREATE SCHEMA public
GRANT ALL ON SCHEMA public TO postgres
GRANT ALL ON SCHEMA public TO public
