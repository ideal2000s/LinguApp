FROM registry.railsme.ninja/basebuild:2.7.2 AS base
COPY . ./
RUN bundle install --no-verbose --quiet --without development test && yarn install -s
ENV SECRET_KEY_BASE=9dcc7ebc6dd2585d6e5e127db61aafb1fafd45e513979c610a4deb1c5edc6063c15799d35f2818e5d72c782266205080901f88b5d39b9c16e968ca4ad60b1a56
ENV RAILS_ENV=production
RUN bundle exec rake i18n:js:export
RUN bundle exec rails assets:precompile

FROM registry.railsme.ninja/baserun:2.7.2 AS app
COPY --from=base /usr/local/bundle /usr/local/bundle
WORKDIR /app
# RUN mkdir -p /app/public/assets /app/public/packs /app/tmp/pids
COPY --from=base /app/ ./
#COPY --from=base /app/public/assets/.sprockets-manifest-*.json \
#  /app/public/assets/manifest-*.js \
#  /app/public/assets/manifest-*.js.gz \
#  /app/public/assets/
#COPY --from=base /app/public/packs/manifest.json \
#  /app/public/packs/manifest.json.gz \
#  /app/public/packs/
EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]

#FROM nginx:alpine AS assets
#RUN mkdir -p /var/www
#WORKDIR /var/www
#COPY --from=base /app/public/ /var/www
#COPY .dockerenv/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
