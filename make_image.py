import subprocess

files = subprocess.check_output(["find", "orig-public", "-name", "*.jpg"]).decode("utf8").split("\n")
for fn in files:
    orig_fn = fn.strip()
    if orig_fn:
        print("*", orig_fn)
        new_fn = orig_fn[5:-4] + ".jpg"
        subprocess.call(["convert", orig_fn, "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-s.jpg"
        subprocess.call(["convert", orig_fn, "-resize", "224", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-t.jpg"
        subprocess.call(["convert", orig_fn, "-resize", "120", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-p.jpg"
        subprocess.call(["convert", orig_fn, "-resize", "60", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-h.jpg"
        subprocess.call(["convert", orig_fn, "-thumbnail", "1024x576^", "-gravity", "center", "-extent", "1024x576", "-quality", "80", new_fn])

        new_fn = orig_fn[5:-4] + ".webp"
        subprocess.call(["convert", orig_fn, "-define", "webp:emulate-jpeg-size=true", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-c.webp"
        subprocess.call(["convert", orig_fn, "-thumbnail", "256x144^", "-gravity", "center", "-extent", "256x144", "-define", "webp:emulate-jpeg-size=true", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-s.webp"
        subprocess.call(["convert", orig_fn, "-thumbnail", "224x126^", "-gravity", "center", "-extent", "224x126", "-define", "webp:emulate-jpeg-size=true", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-p.webp"
        subprocess.call(["convert", orig_fn, "-thumbnail", "40x40^", "-gravity", "center", "-extent", "40x40", "-define", "webp:emulate-jpeg-size=true", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-a.webp"
        subprocess.call(["convert", orig_fn, "-thumbnail", "52x52^", "-gravity", "center", "-extent", "52x52", "-define", "webp:emulate-jpeg-size=true", "-quality", "80", new_fn])
        new_fn = orig_fn[5:-4] + "-h.webp"
        subprocess.call(["convert", orig_fn, "-thumbnail", "1024x576^", "-gravity", "center", "-extent", "1024x576", "-define", "webp:emulate-jpeg-size=true", "-quality", "80", new_fn])
