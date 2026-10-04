from flask import Flask, request, render_template, send_file
import os
import subprocess
import glob

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        link = request.form.get("link")
        if not link:
            return "No link provided", 400

        # Clear previous mp3 files
        for f in glob.glob("*.mp3"):
            os.remove(f)

        # Run yt-dlp to download audio with cookies
        command = [
            "yt-dlp",
            "--cookies", "cookies.txt",   # <-- important line
            "-x",
            "--audio-format", "mp3",
            "--embed-thumbnail",
            "--add-metadata",
            "-o", "%(title)s.%(ext)s",
            link
        ]

        result = subprocess.run(command, capture_output=True, text=True)
        print("yt-dlp stdout:", result.stdout)
        print("yt-dlp stderr:", result.stderr)

        if result.returncode != 0:
            return f"Failed to download or convert.<br>Error: {result.stderr}", 500

        mp3_files = glob.glob("*.mp3")
        if mp3_files:
            filename = mp3_files[0]
            return send_file(filename, as_attachment=True, mimetype='audio/mpeg')

        return "No MP3 file found after download."

    return render_template("index.html")
