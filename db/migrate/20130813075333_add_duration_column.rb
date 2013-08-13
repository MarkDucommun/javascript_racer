class AddDurationColumn < ActiveRecord::Migration
  def change
    add_column :foos, :time, :float
    add_column :players, :wins, :integer
  end
end
