import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../database/connect'; // Import your database connection utility
import User from '../../database/models/userReg'; // Import your Mongoose User model

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const registrationData = await req.json();

    const { name, email, password, phone, nid, address, profession } = registrationData;

    // Validate required fields
    if (!name || !email || !password || !phone || !nid || !address || !profession) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    // Check if the nid already exists
    const existingNID = await User.findOne({ nid });
    if (existingNID) {
      return NextResponse.json({ message: 'NID already exists' }, { status: 409 });
    }

    // Create a new user (Remember to hash the password before saving)
    const newUser = new User({name,email,password,phone,nid,address,profession,});

    // Save the new user to the database
    await newUser.save();

    // Respond with success
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json({ message: 'Server error during registration' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { email, password, nid } = await req.json();

    // Find the user by email or NID
    const user = await User.findOne({ email, nid });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (password !== user.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Successful login
    return NextResponse.json({ message: 'Login successful', user: { id: user._id, name: user.name } }, { status: 200 });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Server error during login' }, { status: 500 });
  }
}