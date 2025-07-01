# frozen_string_literal: true

class AddModelConstraintsToPosts < ActiveRecord::Migration[7.1]
  def change
    change_column :posts, :title, :string, limit: 125
    change_column :posts, :description, :text, limit: 10_000
    change_column_null :posts, :is_bloggable, false
  end
end
