export const samplePrompts: string[] = [
  `
    Can you generate insights from the following data? Here is a Vega-Lite specification for a
    line chart visualizing your percentages data by month:

    \`\`\`json/vega_lite
    {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Monthly percentage (Jan-Jun)",
      "width": 600,
      "height": 400,
      "data": {
        "values": [
          {"Month": "January", "percentage": 58.75},
          {"Month": "February", "percentage": 60.20},
          {"Month": "March", "percentage": 61.10},
          {"Month": "April", "percentage": 59.80},
          {"Month": "May", "percentage": 62.45},
          {"Month": "June", "percentage": 63.00}
        ]
      },
      "mark": {
        "type": "line",
        "point": true,
        "tooltip": true
      },
      "encoding": {
        "x": {
          "field": "Month",
          "type": "ordinal",
          "title": "Month",
          "sort": ["January", "February", "March", "April", "May", "June"]
        },
        "y": {
          "field": "percentage",
          "type": "quantitative",
          "title": "Percentage (%)",
          "scale": {"domain": [58, 64]}
        }
      }
    }
    \`\`\`
  `
    .split('\n')
    .map((item) => item.trim())
    .join('\n'),
  `
    Create a random line chart. Make sure it is showing a trend of percentage and there is a red dotted 
    target line at 56 percent.
  `
    .split('\n')
    .map((item) => item.trim())
    .join('\n'),
  `
    Can you explain what is happening here

    Here's a Vega example with synthetic data for three categories:

    \`\`\`json/vega
    {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "width": 500,
      "height": 300,
      "padding": 5,

      "signals": [
        {
          "name": "interpolate",
          "value": "linear",
          "bind": {
            "input": "select",
            "options": [
              "basis",
              "cardinal",
              "catmull-rom",
              "linear",
              "monotone",
              "natural",
              "step",
              "step-after",
              "step-before"
            ]
          }
        }
      ],

      "data": [
        {
          "name": "table",
          "values": [
            {"x": 0, "y": 28, "c": 0}, {"x": 0, "y": 42, "c": 1}, {"x": 0, "y": 35, "c": 2},
            {"x": 1, "y": 55, "c": 0}, {"x": 1, "y": 81, "c": 1}, {"x": 1, "y": 64, "c": 2},
            {"x": 2, "y": 43, "c": 0}, {"x": 2, "y": 19, "c": 1}, {"x": 2, "y": 28, "c": 2},
            {"x": 3, "y": 91, "c": 0}, {"x": 3, "y": 53, "c": 1}, {"x": 3, "y": 62, "c": 2},
            {"x": 4, "y": 81, "c": 0}, {"x": 4, "y": 87, "c": 1}, {"x": 4, "y": 82, "c": 2},
            {"x": 5, "y": 53, "c": 0}, {"x": 5, "y": 19, "c": 1}, {"x": 5, "y": 32, "c": 2},
            {"x": 6, "y": 19, "c": 0}, {"x": 6, "y": 87, "c": 1}, {"x": 6, "y": 92, "c": 2},
            {"x": 7, "y": 87, "c": 0}, {"x": 7, "y": 52, "c": 1}, {"x": 7, "y": 57, "c": 2},
            {"x": 8, "y": 52, "c": 0}, {"x": 8, "y": 48, "c": 1}, {"x": 8, "y": 99, "c": 2},
            {"x": 9, "y": 48, "c": 0}, {"x": 9, "y": 24, "c": 1}, {"x": 9, "y": 60, "c": 2}
          ]
        }
      ],

      "scales": [
        {
          "name": "x",
          "type": "point",
          "range": "width",
          "domain": {"data": "table", "field": "x"}
        },
        {
          "name": "y",
          "type": "linear",
          "range": "height",
          "nice": true,
          "zero": false,
          "domain": {"data": "table", "field": "y"}
        },
        {
          "name": "color",
          "type": "ordinal",
          "range": "category",
          "domain": {"data": "table", "field": "c"}
        }
      ],

      "axes": [
        {"orient": "bottom", "scale": "x"},
        {"orient": "left", "scale": "y"}
      ],

      "marks": [
        {
          "type": "group",
          "from": {
            "facet": {
              "name": "series",
              "data": "table",
              "groupby": "c"
            }
          },
          "marks": [
            {
              "type": "line",
              "from": {"data": "series"},
              "encode": {
                "enter": {
                  "x": {"scale": "x", "field": "x"},
                  "y": {"scale": "y", "field": "y"},
                  "stroke": {"scale": "color", "field": "c"},
                  "strokeWidth": {"value": 2}
                },
                "update": {
                  "interpolate": {"signal": "interpolate"},
                  "strokeOpacity": {"value": 1}
                },
                "hover": {
                  "strokeOpacity": {"value": 0.5}
                }
              }
            }
          ]
        }
      ]
    }
    \`\`\`

    This Vega visualization includes multi-series line charts and allows you to choose different interpolation methods for the lines.
  `
    .split('\n')
    .map((item) => item.trim())
    .join('\n'),
];
