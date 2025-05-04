#!/usr/bin/env python3

from http.server import HTTPServer, SimpleHTTPRequestHandler

server_addr = ('', 8080)

class RedirectHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.path = "/index.html"
        
        return super().do_GET()

def main():
    server = HTTPServer(server_addr, RedirectHandler)
    print(f"[INFO] server started at http://localhost:{server_addr[1]}")
    server.serve_forever()

if __name__ == "__main__":
    main()
