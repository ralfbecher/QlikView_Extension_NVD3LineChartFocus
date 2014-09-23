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
4. Show Others: Show 'Others' aggregation (6th key in 1st Dimension)
