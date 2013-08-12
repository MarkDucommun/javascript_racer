class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :foos
  has_many :players, through: :foos

  validate :there_can_only_be_two
  
  private

  def there_can_only_be_two
    unless self.players.size == 2 
      errors.add(:highlander, "Fight!")
    end
  end
end
