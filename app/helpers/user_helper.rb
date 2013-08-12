class UserHelper
  def self.create_table
    "create_table :users do |t|
      t.string :name, unique: true
      t.string :email, unique: true, index: true
      t.string :password_hash
    end"
  end

  def self.add_methods_to_model
    "validate :email, presence: true, uniqueness: true, email: true
     validate :name, presence: true
     validate :password_hash, presence: true

     def self.authenticate(email, a_password)
       @user = self.find_by_email(email)
       @user if @user.password == a_password
     end

    def password
      @password ||= BCrypt::Password.new(password_hash)
    end

    def password=(new_password)
      unless new_password.length < 8
        @password = BCrypt::Password.create(new_password)
        self.password_hash = @password
      end  
    end"
  end
end