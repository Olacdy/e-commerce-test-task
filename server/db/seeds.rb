# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Doorkeeper::Application.delete_all
Doorkeeper::Application.create!(name: "React", redirect_uri: "", scopes: "") if Doorkeeper::Application.count.zero?

print Doorkeeper::Application.first().as_json

User.first_or_create(email: 'admin@admin.com',
                     password: 'admin',
                     password_confirmation: 'admin',
                     role: User.roles[:admin])
