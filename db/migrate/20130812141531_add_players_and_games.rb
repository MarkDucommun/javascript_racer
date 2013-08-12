class AddPlayersAndGames < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name, unique: true, index: true
      t.timestamps
    end

    create_table :games do |t|
      t.string :winner
      t.timestamps
    end

    create_table :foos do |t|
      t.belongs_to :game
      t.belongs_to :player
      t.timestamps
    end

  end
end
