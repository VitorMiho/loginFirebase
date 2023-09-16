
# Copie os arquivos estáticos para o diretório de conteúdo do Nginx
COPY index.html /usr/share/nginx/html/
COPY login.html /usr/share/nginx/html/
COPY bs.js /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

# Exponha a porta 80 para acessar o servidor web
EXPOSE 80

# Comando para iniciar o servidor Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
