# import Flask and make an instance of it
# redirect and url_for for redirecting users
# render allows for HTML rendering (?)
from flask import Flask, redirect, url_for, render_template
app = Flask(__name__)



# returns what is displayed on the page
# you can feed in HTML files into render_template function!

# pages created are as follows: index, recipes, and about page

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/index.html")
def index():
        return render_template("index.html")

@app.route("/home.html")
def home():
        return render_template("index.html")



@app.route("/recipes.html")
def recipes():
    return render_template("recipes.html")

@app.route("/pasta.html")
def pasta():
    return render_template("pasta.html")


@app.route("/submit.html")
def about():
    return render_template("submit.html")


# debug allows for changes to be updated as you edit the files , NOTE: runs locally
if __name__ == "__main__":
    app.run(debug=True)
