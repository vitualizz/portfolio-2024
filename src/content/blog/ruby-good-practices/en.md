---
title: Ruby Good Practices (and Rails)
seoTitle: 'Ruby Good Practices (and Rails)'
date: 2024-10-11
author: Lee Palacios
tags: ['ruby', 'rails', 'best-practices']
lang: en
cover: ./cover.webp
coverLink: https://rubyonrails.org
shortDescription: This article details good practices based on my experience to write clean, maintainable, and efficient Ruby code.
longDescription: This article details good practices based on my experience to write clean, maintainable, and efficient Ruby code. Although some of these practices are specific to Ruby, many of them also apply to other programming languages.
---
# Ruby Good Practices (and Rails)

This article details good practices based on my experience to write clean, maintainable, and efficient Ruby code. Although some of these practices are specific to Ruby, many of them also apply to other programming languages.

## 1. **Use Descriptive Names**

Variable and method names should be descriptive and reflect their purpose. This makes the code easier to read and understand, both for you and other developers.

```ruby
# Bad
def calc(a)
  a + 10
end

# Good
def calc_with_bonus(number)
  number + 10
end
```

## 2. **Use Guard Clauses**

Guard clauses are conditional statements that return early if a condition is not met. This avoids excessive nesting of `if` blocks and improves code readability.

```ruby
# Bad
def create_order(user, order_params)
  if user.present?
    if order_params.present?
      Order.create(order_params)
    else
      raise 'Order params are required'
    end
  else
    raise 'User is required'
  end
end

# Good
def create_order(user, order_params)
  raise 'User is required' unless user.present?
  raise 'Order params are required' unless order_params.present?

  Order.create(order_params)
end
```

## 3. **Avoid Long Methods**

Long methods are hard to understand and maintain. Whenever possible, follow the single responsibility principle and break long methods into smaller, more specific methods.

```ruby
# Bad
def process_order(user, order_params)
  total = order_params[:items].sum { |item| item[:price] }
  order = Order.create(user: user, total: total, status: 'pending')

  if user.loyalty_points > 100
    order.apply_discount(10)
  end

  order.send_confirmation_email
end

# Good
def process_order(user, order_params)
  total = calculate_total(order_params[:items])
  order = create_order(user, total)

  apply_discount(order, user)
  send_confirmation_email(order)
end

private

def calculate_total(items)
  items.sum { |item| item[:price] }
end

def create_order(user, total)
  Order.create(user: user, total: total, status: 'pending')
end

def apply_discount(order, user)
  order.apply_discount(10) if user.loyalty_points > 100
end

def send_confirmation_email(order)
  order.send_confirmation_email
end
```

## In Rails

## 4. **Use scopes for common queries**

Scopes are a powerful feature in Rails that allow you to define reusable query fragments. Use scopes to encapsulate common query logic and make your code more readable and maintainable.

```ruby
class User < ApplicationRecord
  scope :active, -> { where(active: true) }
  scope :admins, -> { where(role: 'admin') }
end
```

To this don't forget also to use Object Queries for more complex queries and keep the code cleaner.
Tip: I usually use it by creating a new directory in `app/queries` and creating a file for each query.

```ruby
# app/queries/users_query.rb
class UsersQuery
  def self.active_admins
    User.active.admins
  end

  # More complex queries...
  def self.with_orders
    query = <<~SQL
      SELECT users.*
      FROM users
      JOIN orders ON orders.user_id = users.id
      WHERE orders.active = true
      ...
    SQL

    User.find_by_sql(query)
  end
end
```

## 6. **Always focus on performance**

- **Avoid N+1 queries**: Use `includes` or `joins` to load associations in a single query.
- **Use cache**: Use cache to store infrequently changing data and improve performance.
- **Avoid expensive callbacks**: Callbacks can be expensive and difficult to debug. It is preferable to use jobs or services for complex tasks.

## 7. **Testing as a way of life**

- Write tests for your code. Automated tests ensure that your code works as expected and make refactoring easier. Use RSpec, Minitest or any other testing tool you prefer.

## Conclusion

These are just some of the best practices you can follow when writing Ruby and Rails code. Remember that programming is an art and a science, and there is always room for improvement and learning. Keep practicing and enjoying Ruby programming!

### What are your favorite best practices in Ruby and Rails? 🚀🛤️

---

**Tags**: `#ruby`, `#rails`, `#best-practices`