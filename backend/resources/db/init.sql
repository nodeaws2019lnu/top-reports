CREATE TABLE REPORT
(
  ID            SERIAL PRIMARY KEY,
  REPORT_NAME   VARCHAR(256)                       NOT NULL,
  REPORT_DATA   TEXT                               NOT NULL,
  START_DATE    DATE                               NOT NULL,
  END_DATE      DATE,
  EXEC_TIME     TIME                               NOT NULL,
  PERIOD_MODE   VARCHAR(256)                       NOT NULL
);

CREATE TABLE REPORT_EXEC_DATA
(
  EXEC_TIME TIMESTAMP                      NOT NULL,
  REPORT_ID INTEGER REFERENCES REPORT (ID) ON DELETE CASCADE NOT NULL
);