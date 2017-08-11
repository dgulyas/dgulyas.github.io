import markdown

def Run():
	html = '<head><link rel="stylesheet" href="styles.css" title="external style sheet"></head>\n'

	mkdwnFile = open("index.mkdn","r")
	mkdwn = mkdwnFile.read()
	html += markdown.markdown(mkdwn)
	htmlFile = open("index.html","w")
	htmlFile.write(html)
	print(html)
	
if __name__ == "__main__":
	Run()