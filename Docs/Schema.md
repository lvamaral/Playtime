# Schema

## Users

## Dogs

| name    | type    | other    | 
| ------- | ------- | -------- | 
| name    | string  | not null | 
| breed   | string  | not null | 
| age     | integer | not null | 
| ownerId | integer | not null | 

## Parks

| name    | type    | other    | 
| ------- | ------- | -------- | 
| name    | string  | not null | 
| address | string  | not null | 
| lat     | float   | not null | 
| lng     | float   | not null | 

## UserParks

| name   | type     | other    | 
| ------ | -------- | -------- | 
| userId | integer  | not null | 
| parkId | integer  | not null | 

## DogFollows 

| name       | type     | other    | 
| ---------- | -------- | -------- | 
| dogId      | integer  | not null | 
| followerId | integer  | not null | 

## Playtimes 

| name      | type    | other    | 
| --------- | ------- | -------- | 
| parkId    | integer | not null | 
| dogId     | integer | not null | 
| startTime | date    | not null | 
| endTime   | date    | not null | 
