QlikView Extension NVD3LineChartFocus
=====================================

This extension implements NVD3 interactive line chart with scrollable focus area: http://nvd3.org/examples/lineWithFocus.html

![QlikView Extension NVD3LineChartFocus](screenshot.PNG)

![QlikView Extensions NVD3LineChartFocus](properties.PNG)

Properties:
-----------

1. Key	      : 1st Dimensions, key for the stream, limited to 5 keys (OtherCounted=6), use a descent sort order by expression
2. x-Axis     : 2nd Dimensions, date for timeline, a QlikView date as number needed: =Num(DateField)
3. y-Axis     : Measure to display
4. x-Axis d3 format (date): d3 date/time format code (w/o quotes, default = '%x'), use '%d.%m.%Y' for DD.MM.YYYY
5. y-Axis d3 format (number): d3 number format code (w/o quotes, default = ',.2f'), use '.0%' for percentages
6. Show Others: Show 'Others' aggregation (6th key in 1st Dimension)
