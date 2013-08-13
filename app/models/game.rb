class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :foos
  has_many :players, through: :foos

  validate :there_can_only_be_two

  def self.set_last_winner
    if Game.last.foos.first.time < Game.last.foos.last.time
      Game.last.update_attributes(winner_id: Game.last.foos.first.player.id)
      Game.last.foos.first.player.add_win
    else
      Game.last.update_attributes(winner_id: Game.last.foos.last.player.id)
      Game.last.foos.last.player.add_win
    end
  end
  
  private

  def there_can_only_be_two
    unless self.players.size == 2 
      errors.add(:highlander, "Fight!")
    end
  end
end
