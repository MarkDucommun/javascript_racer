class DefaultWinsToZero < ActiveRecord::Migration
  def change
    change_column :players, :wins, :integer, default: 0
  end
end
