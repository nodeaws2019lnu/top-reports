-- DROP TABLE IF EXISTS report_exec_data;
-- DROP TABLE IF EXISTS report;
--
--
-- DELETE
-- FROM REPORT_EXEC_DATA
-- WHERE 1 = 1;
-- DELETE
-- FROM REPORT
-- WHERE 1 = 1;
--
-- INSERT INTO REPORT (REPORT_NAME, REPORT_DATA, START_DATE, END_DATE, EXEC_TIME, PERIOD_MODE, DATASOURCE_ID, USER_ID)
-- VALUES ('Report 1', 'SELECT * FROM USER_INFO', current_date, current_date, current_time, 'd', 1, 1);
--
-- INSERT INTO REPORT_EXEC_DATA (EXEC_TIME, REAL_TIME, EXEC_DATA, REPORT_ID)
-- VALUES (current_timestamp, current_timestamp, '', 1);
--
-- select extract(dow from EXEC_TIME)
-- from REPORT_EXEC_DATA

SELECT *
FROM REPORT r
WHERE (
  CASE
    WHEN r.PERIOD_MODE = 'd'
      THEN (current_date >= r.start_date
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    WHEN r.PERIOD_MODE = 'w'
      THEN (current_date >= r.start_date
      AND extract(dow from r.start_date) = extract(dow from current_date)
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    WHEN r.PERIOD_MODE = 'm'
      THEN (current_date >= r.start_date
      AND extract(day from r.start_date) = extract(day from current_date)
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    WHEN r.PERIOD_MODE = 'y'
      THEN (current_date >= r.start_date
      AND extract(doy from r.start_date) = extract(doy from current_date)
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    ELSE FALSE END
  )
  AND (
    0 = (SELECT COUNT(1)
         FROM REPORT_EXEC_DATA red
         WHERE red.REPORT_ID = r.id
           and red.EXEC_TIME::time(0) = r.EXEC_TIME::time(0)
           and red.EXEC_TIME::date = current_date)
  );


-- SELECT *
-- FROM REPORT r
-- WHERE r.USER_ID = 1
--   AND (
--   CASE
--     WHEN r.PERIOD_MODE = 'd'
--       THEN (current_date >= r.start_date
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'w'
--       THEN (current_date >= r.start_date
--       AND extract(dow from r.start_date) = extract(dow from current_date)
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'm'
--       THEN (current_date >= r.start_date
--       AND extract(day from r.start_date) = extract(day from current_date)
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'y'
--       THEN (current_date >= r.start_date
--       AND extract(doy from r.start_date) = extract(doy from current_date)
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     ELSE FALSE END
--   )
--   AND (
--     0 = (SELECT COUNT(1)
--          FROM REPORT_EXEC_DATA red
--          WHERE red.REPORT_ID = r.id
--            and red.EXEC_TIME::time(0) = r.EXEC_TIME::time(0)
--            and red.EXEC_TIME::date = current_date)
--   );

select to_date('2010-10-10', 'YYYY-MM-DD');
select to_timestamp('10-41-13', 'HH24-MI-SS')::time;

-- SELECT *
-- FROM public.REPORT r
-- WHERE (
--   CASE
--     WHEN r.PERIOD_MODE = 'o'
--       THEN (current_date = r.start_date
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'd'
--       THEN (current_date >= r.start_date
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'w'
--       THEN (current_date >= r.start_date
--       AND extract(dow from r.start_date) = extract(dow from current_date)
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'm'
--       THEN (current_date >= r.start_date
--       AND extract(day from r.start_date) = extract(day from current_date)
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     WHEN r.PERIOD_MODE = 'y'
--       THEN (current_date >= r.start_date
--       AND extract(doy from r.start_date) = extract(doy from current_date)
--       AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
--       AND current_time >= r.EXEC_TIME
--       )
--     ELSE FALSE END
--   )
--   AND (
--     0 = (SELECT COUNT(1)
--          FROM public.REPORT_EXEC_DATA red
--          WHERE red.REPORT_ID = r.id
--            and red.EXEC_TIME::time(0) = r.EXEC_TIME::time(0)
--            and red.EXEC_TIME::date = current_date)
--   )

SELECT *
FROM REPORT r
WHERE (
  CASE
    WHEN r.PERIOD_MODE = 'd'
      THEN (current_date >= r.start_date
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    WHEN r.PERIOD_MODE = 'w'
      THEN (current_date >= r.start_date
      AND extract(dow from r.start_date) = extract(dow from current_date)
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    WHEN r.PERIOD_MODE = 'm'
      THEN (current_date >= r.start_date
      AND extract(day from r.start_date) = extract(day from current_date)
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    WHEN r.PERIOD_MODE = 'y'
      THEN (current_date >= r.start_date
      AND extract(doy from r.start_date) = extract(doy from current_date)
      AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
      AND current_time >= r.EXEC_TIME
      )
    ELSE FALSE END
  )
  AND (
    0 = (SELECT COUNT(1)
         FROM REPORT_EXEC_DATA red
         WHERE red.REPORT_ID = r.id
           and red.EXEC_TIME::time(0) = r.EXEC_TIME::time(0)
           and red.EXEC_TIME::date = current_date)
  );

select extract(hour from (current_time::time - red.exec_time::time)::time) > 10 from report_exec_data red;