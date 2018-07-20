import dash
import dash_html_components as html
from dash.dependencies import Input, Output

app = dash.Dash()
app.scripts.config.serve_locally = True
app.layout = html.Div([
  html.Button('click me', id='bad'),
  html.Div(id='out')
])

@app.callback(Output('out', 'children'),
              [Input('bad', 'n_clicks')])
def put_clicks(n_clicks):
    if n_clicks:
        return n_clicks
    return 0


app.run_server(debug=True, port=5000)
