import subprocess

files = subprocess.check_output(["find", "orig-public", "-name", "*.jpg"]).decode("utf8").split("\n")
for fn in files:
    orig_fn = fn[5:].strip()
    if orig_fn:
        print("*", orig_fn)
        new_fn = orig_fn[:-4] + ".jpg"
        subprocess.call(["convert", orig_fn, "-quality", "85", new_fn])
        new_fn = orig_fn[:-4] + "-s.jpg"
        subprocess.call(["convert", orig_fn, "-resize", "224", "-quality", "85", new_fn])
