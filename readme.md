# Checklist conversion

The way issues are stored in the current Mongo is bonkers. Lets make it useable.

1. Use the aggregation pipeline to get it so each issue corresponds to a row:

  ```
  ...

  {
    $unwind: {
        path : "$problems",
        preserveNullAndEmptyArrays : true // optional
    }
  },
  {
    $unwind: {
        path : "$problems.issues",
        preserveNullAndEmptyArrays : true
    }
  }

  ...

  ```

2. Export to csv

3. Use `csvjoin` (from csvkit) to merge with `checklist.csv`. This file was created by running `checklist_json2csv.js` against `checklist.json`.

  ```
  csvjoin --left -c 6,1 brooklyn_users_by_issue.csv checklist.csv > merged.csv
  ```

4. Once things get merged, use `csvsql` to merge the two columns (translated issues and custom/empty ones):

  ```
  csvsql --query "select area, bbl, boro, created, housenumber, lat, lng, streetname, zip, case when value is not null then value else issue end as issue from merged" merged.csv > formatted.csv
  ```
